import React from "react";
import { useForm } from "react-hook-form";

export default function TempCheckForm({ values, onChange }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      trailerNumber: values.trailerNumber,
      supervisorName: values.supervisorName,
    },
  });

  const onSubmit = (data) => {
    onChange(data);
  };

  return (
    <form
      onChange={handleSubmit(onSubmit)}
      className="form-root"
      autoComplete="off"
    >
      <h3>Temp Check Sheet Fields</h3>

      <label className="form-field">
        <span>Trailer Number</span>
        <input {...register("trailerNumber")} />
      </label>

      <label className="form-field">
        <span>Supervisor Name</span>
        <input {...register("supervisorName")} />
      </label>

      <p className="form-note">
        Only these values are editable; the rest of the sheet matches your
        Excel template.
      </p>
    </form>
  );
}
