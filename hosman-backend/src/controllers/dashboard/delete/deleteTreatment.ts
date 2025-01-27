import { Request, Response } from 'express';
import Treatment from '../../../models/dashboard/treatment';

// Delete a single treatment by ID
export const deleteTreatmentById = async (req: Request, res: Response):Promise<void> => {
  try {
    const {id} = req.params;
    const deletedTreatment = await Treatment.findByIdAndDelete(id);

    if (!deletedTreatment) {
    res.status(404).json({ message: 'Treatment not found' });
    }

    res.status(200).json({ message: 'Treatment deleted successfully' ,treatmentDeletedBYID:true });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting treatment', error });
  }
};

// Delete all treatments
export const deleteAllTreatments = async (req: Request, res: Response) => {
  try {
    await Treatment.deleteMany({});
    res.status(200).json({ message: 'All treatments deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting treatments', error });
  }
};
