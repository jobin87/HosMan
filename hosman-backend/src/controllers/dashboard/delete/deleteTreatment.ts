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




// Handler to delete all treatments
export const deleteAllTreatments = async (req: Request, res: Response): Promise<void> => {
    try {
        // Delete all treatments
        const result = await Treatment.deleteMany({});

        // Check if any treatments were deleted
        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'All treatments have been deleted successfully' });
        } else {
            res.status(404).json({ message: 'No treatments found to delete' });
        }
    } catch (error) {
        console.error("Error deleting treatments:", error);
        res.status(500).json({ message: 'Error deleting treatments' });
    }
};

