import { useUploadPhotoForm } from "../hook";
import {
  photoFileRules,
  descRules,
  dateRules,
  tagsRules,
} from "../Photo.rules";
import AddEditPhotoFormWidget from "../AddEditPhotoFormWidget";
import { TTagsData } from "../../../store/types";
import { addPhotoFormTitle } from "../../../config";

interface IAddPhotoFormProps {
  uploadLoading: boolean;
  tagsData: TTagsData;
  addPhoto: (formData: IAddPhotoFormData) => void;
}

export interface IAddPhotoFormData {
  desc: string;
  date: Date;
  photoFile: FileList;
  tags: { [name: string]: boolean };
}

export const registerInfo = [
  { name: "tags", rules: tagsRules },
  { name: "date", rules: dateRules },
];

export const AddPhotoForm = ({
  uploadLoading,
  addPhoto,
  tagsData,
}: IAddPhotoFormProps) => {

  const uploadPhotoFormData = useUploadPhotoForm<IAddPhotoFormData>(
    tagsData,
    registerInfo
  );

  const submit = (formData: IAddPhotoFormData) => {
    console.log("SUBMIT", formData);
    addPhoto(formData);
  };

  console.log("[RENDER ADD FORM WIDGET]");

  return (
    <AddEditPhotoFormWidget
      title={addPhotoFormTitle}
      photoFileRules={photoFileRules}
      descRules={descRules}
      onSubmit={uploadPhotoFormData.handleSubmit(submit)}
      uploadLoading={uploadLoading}
      uploadPhotoFormData={uploadPhotoFormData}
    />
  );
}


export default AddPhotoForm;
