const {Schema,model}= require('mongoose'); // Erase if already required
const DOCUMENT_NAME="Shop"
const COLLECTION_NAME="Shops"
// Declare the Schema of the Mongo model
const shopSchema = new Schema({
    name:{
        type:String,
        trim:true,
        maxLenght:140
    },
    email:{
        type:String,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        // unique:true,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"inactive"
    },
    verify:{
        type:Schema.Types.Boolean,
        default:false
    },
    roles:{
        type:Array,
        default:false
    },
},{
    timestamps:true,
    collection:COLLECTION_NAME
});

//Export the model
module.exports = model(DOCUMENT_NAME, shopSchema);