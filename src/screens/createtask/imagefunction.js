import { createImage } from '../../database/createqueries';

export async function pickImage(taskid) {
        try {
       const ress = await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.images],
          });
          createImage(ress,taskid,'image');
    } catch(error) {
        console.log(error);
    }
 }


export async function pickDocument(taskid) {
  try {
 const ress = await DocumentPicker.pickMultiple({
  type: [DocumentPicker.types.allFiles],
    });
    createImage(ress,taskid,'document');
} catch(error) {
  console.log(error);
}
}
