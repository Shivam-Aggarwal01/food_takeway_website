import User from "../models/User.model.js";
import Food from "../models/Food.model.js";

// ✅ Add item to cart
export const addToCart = async (req, res) => {
  try {
    const { userId, foodId, selectedOptions = [], quantity = 1 } = req.body;
    console.log("Add to cart request:", { userId, foodId, selectedOptions, quantity }); // Debug log

    // Validate required fields
    if (!userId || !foodId) {
      return res.status(400).json({ 
        success: false, 
        message: "userId and foodId are required" 
      });
    }

    // Validate quantity
    if (quantity <= 0 || !Number.isInteger(quantity)) {
      return res.status(400).json({ 
        success: false, 
        message: "Quantity must be a positive integer" 
      });
    }

    const user = await User.findById(userId);
    const food = await Food.findById(foodId);
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    if (!food) {
      return res.status(404).json({ success: false, message: "Food item not found" });
    }

    // Ensure selectedOptions is always an array of strings (option names)
    const selectedOptionsNames = selectedOptions.map(opt => typeof opt === 'string' ? opt : (opt.name || ''));

    // Find price of selected options
    const selectedOptionDetails = selectedOptionsNames.map(name => {
      const matched = food.extraOptions.find(opt => opt.name === name);
      return {
        name,
        price: matched ? matched.price : 0
      };
    });

    const extraPrice = selectedOptionDetails.reduce((sum, opt) => sum + opt.price, 0);
    const totalPrice = (food.price + extraPrice) * quantity;

    // Ensure user.cart exists
    if (!user.cart) {
      user.cart = [];
    }

    // Check if item already in cart (same food + same selected options)
    const existingItemIndex = user.cart.findIndex(item =>
      item.food.toString() === foodId &&
      JSON.stringify((item.selectedOptions || []).sort()) === JSON.stringify(selectedOptionsNames.sort())
    );

    if (existingItemIndex !== -1) {
      // Update quantity and price
      user.cart[existingItemIndex].quantity += quantity;
      user.cart[existingItemIndex].price += totalPrice;
    } else {
      // Add new item to cart
      user.cart.push({
        food: food._id,
        quantity,
        selectedOptions: selectedOptionsNames,
        price: totalPrice
      });
    }

    await user.save();
    console.log("Cart updated successfully. Cart items count:", user.cart.length); // Debug log
    res.json({ 
      success: true, 
      message: "Item added to cart successfully",
      cartItemsCount: user.cart.length
    });
  } catch (err) {
    console.error("Add to cart error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// ✅ Get cart with populated food and option prices
export const getCartItems = async (req, res) => {
  try {
    const userId = req.body.userId || req.query.userId || req.userId;
    
    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID is required" });
    }
    
    const user = await User.findById(userId).populate("cart.food");
    
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const cartDetails = (user.cart || []).map(item => {
      const food = item.food;
      if (!food) {
        console.warn(`Food item not found for cart item: ${item.food}`);
        return null;
      }
      
      const selectedDetails = (item.selectedOptions || []).map(name => {
        const match = food.extraOptions.find(opt => opt.name === name);
        return {
          name,
          price: match ? match.price : 0
        };
      });

      return {
        foodId: food._id,
        name: food.name,
        image: food.image,
        quantity: item.quantity,
        basePrice: food.price,
        selectedOptions: selectedDetails,
        itemTotal: item.price
      };
    }).filter(item => item !== null); // Remove null items

    res.json({ success: true, cart: cartDetails });
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
};

// ✅ Remove item from cart (one full item group)
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.body.userId || req.query.userId || req.userId;
    const { foodId, selectedOptions = [] } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Ensure user.cart exists
    if (!user.cart) {
      user.cart = [];
    }

    const itemIndex = user.cart.findIndex(item =>
      item.food.toString() === foodId &&
      JSON.stringify((item.selectedOptions || []).sort()) === JSON.stringify(selectedOptions.sort())
    );

    if (itemIndex !== -1) {
      if (user.cart[itemIndex].quantity > 1) {
        // Decrement quantity and update price
        const food = await Food.findById(foodId);
        const selectedOptionDetails = selectedOptions.map(name => {
          const matched = food.extraOptions.find(opt => opt.name === name);
          return {
            name,
            price: matched ? matched.price : 0
          };
        });
        const extraPrice = selectedOptionDetails.reduce((sum, opt) => sum + opt.price, 0);
        const singleItemPrice = food.price + extraPrice;
        user.cart[itemIndex].quantity -= 1;
        user.cart[itemIndex].price -= singleItemPrice;
      } else {
        // Remove item if quantity is 1
        user.cart.splice(itemIndex, 1);
      }
    }

    await user.save();
    res.json({ success: true, message: "Item updated/removed from cart" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
