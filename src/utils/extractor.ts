import { TherapistInfo, Specialisms } from '../types';

let specialismsArray: Specialisms[];

export const extractSpecialisms = (
  therapists: TherapistInfo[],
  therapistSpecialisms: Specialisms[]
) => {
  specialismsArray = [...therapistSpecialisms];
  therapists.forEach((therapist) => {
    therapist.specialisms.forEach((s) => {
      if (!specialismsArray.includes(s)) {
        return (specialismsArray = [...specialismsArray, s]);
      }
    });
  });
  return specialismsArray.sort();
};
