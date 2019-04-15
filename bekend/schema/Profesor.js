var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProfesorSchema = new Schema({
        ime:
        {
            type: "String",
            required: true,
            unique: true
        }, 
        prezime: {
            type: "String",
            required: true,
            unique: true
        }, 
		slika: "String",
        predmeti: {
            type: ["String"],
            required: true,
            default: []
        },
        srednjaOcena: {
            type: "Number",
            default: 0,
            required: true
        },
		ocene: [{
			ocena:{
            type: "Number",
            pattern: '[1-5]{1}'
			}
        }],
        komentari: [
            {
				title: 
				{
					type: "String"
				},
                komentar:
                {
                    type: "String"
                },
                likes:"Number",
                dislikes:"Number",
				hide:{
					type:"Number",
					pattern: '[0-1]{1}'
				}
            }
        ]
    } , { collection: 'listaProfesora' } 
);

var profesori = mongoose.model('profesori', ProfesorSchema);
module.exports = profesori;