import { Schema, model } from 'mongoose';

const waterSchema = new Schema(  {
    date: {      
        type: Date,
      required: true,    
    },
    amount: {     
     type: String,
      required: true,    
    },
      curDaylyNorm: { 
      type: String, 
       required: true,  
    }, 
   servings: {     
     type: String,
    required: true, 
    },   
  userId: {
      type: Schema.Types.ObjectId,      
      ref: 'user',
      required: true,    },
 
  },  { versionKey: false, timestamps: true },
);

const WaterCollection = model('water', waterSchema );
export default WaterCollection ;