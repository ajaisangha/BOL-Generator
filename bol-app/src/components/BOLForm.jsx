import React from "react";
import { useForm } from "react-hook-form";

export default function BOLForm({ values, onChange }) {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      trailerNumber: values.trailerNumber,
      sealNumber: values.sealNumber,
      qty: values.qty,
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
      <h3>BOL Fields</h3>

      <label className="form-field">
        <span>Trailer Number</span>
        <input {...register("trailerNumber")} />
      </label>

      <label className="form-field">
        <span>Seal Number</span>
        <input {...register("sealNumber")} />
      </label>

      <label className="form-field">
        <span>Qty (Totes)</span>
        <input type="number" {...register("qty")} />
      </label>

      <p className="form-note">
        These fields are bound into the Excel-like BOL layout on the right.
      </p>
    </form>
  );
}
