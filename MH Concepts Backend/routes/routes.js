const router=require("express").Router()
const{getDashboardStats,getSingleProduct,getAllProducts,DeleteLead,updateLeadStatus,getAllLeads,signup,getProductByCategory,deleteProduct,UpdateProduct,CreateProduct,logout,login}=require("../controllers/AdminController");
const{auth,isAdmin}=require("../middlewares/auth");
const{submitInquiry}=require("../controllers/LeadController");

router.post("/signup",auth,isAdmin,signup);
router.get("/getAllLeads",auth,isAdmin,getAllLeads);
router.get("/getDashboardStats",auth,isAdmin,getDashboardStats);

router.post("/CreateProduct",auth,isAdmin,CreateProduct);
router.post("/logout",auth,logout);
router.post("/login",login);
router.post("/submitInquiry",submitInquiry);

router.get("/getAllProducts",getAllProducts);
router.delete("/DeleteLead/:id",auth,isAdmin,DeleteLead);
router.put("/updateLeadStatus/:id",auth,isAdmin,updateLeadStatus);
router.get("/getProductByCategory/:categoryName",getProductByCategory);
router.delete("/deleteProduct/:product_code",auth,isAdmin,deleteProduct);
router.put("/UpdateProduct/:product_code",auth,isAdmin,UpdateProduct);
router.get("/getSingleProduct/:product_code",getSingleProduct);

module.exports=router;

