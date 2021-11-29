const mongoose=require('mongoose');
const Schema=mongoose.Schema;
require('mongoose-currency').loadType(mongoose);
const Currency=mongoose.Types.Currency;

const promoSchema = new Schema({
    name: {
        type:String,
        require:true,
        unique:true
    },
    image:{
        type:String,
        require:true
    },
    label: {
        type: String,
        default: ''
    },
    price: {
        type: Currency,
        required: true,
        min: 0
    },
    description:{
        type:String,
        require:true
    },

    featured: {
        type: Boolean,
        default:false      
    }
},{
    timestamps:true
});

var Promo =mongoose.model('Promo',promoSchema);

module.exports = Promo;


