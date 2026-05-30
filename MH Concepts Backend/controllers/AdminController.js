
const Product=require("../models/ProductSchema");
const User=require("../models/UserSchema.js");
const bcrypt=require("bcrypt");
const Lead=require("../models/LeadSchema.js")
const jwt=require("jsonwebtoken");
const cloudinary=require("cloudinary").v2;
async function uploadToCloudinary(file,folder){
    
        const options={folder};
        options.resource_type="auto";
        const response=await cloudinary.uploader.upload(file.tempFilePath,options);
        return response;
}
exports.signup=async(req,res)=>{
const{name,email,password}=req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }
const existingUser=await User.findOne({email});
if(existingUser){
    return res.status(400).json({
        success:false,
        message:"User already exist"
    })
}
let hashPassword=await bcrypt.hash(password,10);

await User.create({name,email,password:hashPassword,role:"Admin"})
res.status(201).json({success:true,message:"User Created"});
}

exports.login=async(req,res)=>{
    const{email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Fill all the credentials"
        })
    }
    const userFound=await User.findOne({email})
    if(!userFound){
        return res.status(404).json({
            success:false,
            message:"User Not Found"
        })
    }
    if(await bcrypt.compare(password,userFound.password)){
        const payload={
            id:userFound._id,
            email:userFound.email,
            role:userFound.role,
            
        }
        const token=jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:"2h"})//{expiresIn:"1h"}
        res.cookie("token",token,{httpOnly:true});
        return res.status(200).json({
            message:"Logged in Successfully",
            token,
            role:userFound.role
        })
    }else {
            return res.status(401).json({
                success: false,
                message: "Password Incorrect"
            });
        }

    
}
exports.logout = async (req, res) => {
    try {
        res.clearCookie("token");
        
        res.status(200).json({
            success: true,
            message: "Logged out successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// exports.getCurrentUser=async(req,res)=>{
//   try {
//     const currentUser=await User.findById(req.user.id).select('-password');
//     res.status(200).json({
//       success:true,
//       currentUser
//     })
    
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
  
    
//   }
// }

exports.CreateProduct=async(req,res)=>{
    try {
         const { title, desc, category, product_code, price } = req.body;
         const file=req.files.file;
         if(!file){
            return res.status(400).json({
                success:false,
                message:"Image is required !"
            })
         }
         const existCode=await Product.findOne({product_code:product_code});
         if(existCode){
            return res.status(400).json({
                success:false,
                message:"Code Already Exist ! Try another "

            })

         }
         const response=await uploadToCloudinary(file,"MH_Concepts_Files");
         const newProduct=await Product.create({
            product_code,title, desc, category, price ,image_URL:response.secure_url,image_public_id:response.public_id
         })
         res.status(200).json({
            success:true,
            message:"Product created successfully and image uploaded!",
            data:newProduct
         })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.UpdateProduct=async(req,res)=>{
    try {
        const {product_code}=req.params;
        let upadtedData={...req.body};
        let oldProduct=await Product.findOne({product_code:product_code});

        if(req.files && req.files.file){
            if(oldProduct.image_public_id){
                await cloudinary.uploader.destroy(oldProduct.image_public_id)
            }
            const response=await uploadToCloudinary(req.files.file,"MH_Concepts_Files");
            upadtedData.image_URL=response.secure_url;
            upadtedData.image_public_id=response.public_id;
        }
        const updatedProduct=await Product.findOneAndUpdate({product_code:product_code},upadtedData,{new:true});
        res.status(200).json({
            success:true,
            data:updatedProduct,
            message:"Product has upadted 😊"
        })
        
    } catch (error) {
                res.status(500).json({
            success:false,
            message:"Something went wrong in updating product 😑"
        })
        
    }
}

exports.deleteProduct=async(req,res)=>{
    try {
        const{product_code}=req.params;
        const response=await Product.findOne({product_code:product_code});
        if(!response){
            return res.status(404).json({
                success:false,message:"Product code not found 😑"
            })
        }
        if(response.image_public_id){
            await cloudinary.uploader.destroy(response.image_public_id)
        }
        await Product.findOneAndDelete({product_code:product_code});
        res.status(200).json({
            success:true,
            message:"Product Deleted 👍"
        })
        
    } catch (error) {
                res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}

exports.getProductByCategory=async(req,res)=>{
    try {
        const{categoryName}=req.params;
        const product=await Product.find({category:categoryName});
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Can not find Product 😑"
            })
        }
        res.status(200).json({
            success:true,
            product
        })
        
    } catch (error) {
                res.status(500).json({
            message:error.message
        })
        
    }
}
exports.getAllLeads=async(req,res)=>{
    try {
        const Leads=await Lead.find().sort({createdAt:-1})
        res.status(200).json({
            success:true,
            message:"All Leads Fetched Successfully",
            data:Leads
        })
        
    } catch (error) {
                res.status(500).json({
            success:false,
            message:error.message
        })
        
    }
}
exports.updateLeadStatus=async(req,res)=>{
    try {
        const {id}=req.params;
        const{status}=req.body;
        const updatedLead=await Lead.findByIdAndUpdate(id,{status},{new:true});
        res.status(200).json({ success: true, updatedLead });

        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.DeleteLead=async(req,res)=>{
    try {
        const {id}=req.params;
        await Lead.findByIdAndDelete(id);
        res.status(200).json({ success: true, message:"Lead Deleted Successfully !"});

        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}

exports.getAllProducts=async(req,res)=>{
    try {
        const products=await Product.find().sort({createdAt:-1});
        res.status(200).json({ success: true, data:products });

        
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
        
    }
}

exports.getSingleProduct=async(req,res)=>{
    try {
        const{product_code}=req.params;
        const product=await Product.findOne({product_code:product_code});
        if(!product){
            res.status(404).json({
                success:false,message:"Not Found "
            })
        }
        res.status(200).json({ success: true, data:product });
        
    } catch (error) {
         res.status(500).json({ success: false, message: error.message });
    }
}
exports.getDashboardStats = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();
        const totalLeads = await Lead.countDocuments();
        const newLeads = await Lead.countDocuments({ status: "New" });

        res.status(200).json({
            success: true,
            stats: { totalProducts, totalLeads, newLeads }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};