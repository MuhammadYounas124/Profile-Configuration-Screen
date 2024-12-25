import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "admin-lte/dist/css/adminlte.min.css";

const JSONFieldAttributesForm = () => {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      fieldName: "",
      description: "",
      required: false,
      nullable: false,
      datatype: "",
      startValue: "",
      endValue: "",
      minLength: "",
      maxLength: "",
      defaultValue: "",
      booleanDefault: "True",
      enumValues: [{ id: Date.now(), value: "", type: "Int" }],
    },
  });

  const datatype = watch("datatype");
  const [enumList, setEnumList] = useState([{ id: Date.now(), value: "", type: "Int" }]);
  const [formData, setFormData] = useState(null);

  // Add Enum Field
  const addEnum = () => {
    setEnumList([...enumList, { id: Date.now(), value: "", type: "Int" }]);
  };

  // Remove Enum Field
  const removeEnum = (id: number) => {
    setEnumList(enumList.filter((item) => item.id !== id));
  };

  const onSubmit = (data: any) => {
    console.log("Form Data:", data);
    setFormData(data);
  };

  return (
    <div className="container mt-4">
      {/* Centered Form Title */}
      <h2 className="mb-4 text-center">JSON Field Attributes</h2>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Field Name */}
        <label className="form-label">Field Name *</label>
        <Controller
          name="fieldName"
          control={control}
          rules={{ required: "Field name is required" }}
          render={({ field, fieldState }) => (
            <>
              <input
                className="form-control"
                {...field}
                placeholder="e.g. Invoice Id"
              />
              {fieldState.error && (
                <span className="text-danger">{fieldState.error.message}</span>
              )}
            </>
          )}
        />

        {/* Description */}
        <label className="form-label mt-3">Description</label>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <input
              className="form-control"
              {...field}
              placeholder="Type description here"
            />
          )}
        />

        {/* Required Checkbox */}
        <div className="mt-3">
          <Controller
            name="required"
            control={control}
            render={({ field }) => (
              <label className="me-3">
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                Required
              </label>
            )}
          />

          {/* Nullable Checkbox */}
          <Controller
            name="nullable"
            control={control}
            render={({ field }) => (
              <label>
                <input
                  type="checkbox"
                  className="form-check-input me-2"
                  checked={field.value}
                  onChange={(e) => field.onChange(e.target.checked)}
                />
                Nullable
              </label>
            )}
          />
        </div>

        {/* Datatype Dropdown */}
        <label className="form-label mt-3">Datatype *</label>
        <Controller
          name="datatype"
          control={control}
          rules={{ required: "Datatype is required" }}
          render={({ field }) => (
            <select className="form-select" {...field}>
              <option value="">Select datatype</option>
              <option value="Int">Int</option>
              <option value="String">String</option>
              <option value="Boolean">Boolean</option>
              <option value="Number">Number</option>
              <option value="Enum">Enum</option>
              <option value="Array">Array</option>
            </select>
          )}
        />

        {/* Conditional Fields */}
        {datatype === "Int" && (
          <>
            <label className="form-label mt-3">Start Value (optional)</label>
            <Controller
              name="startValue"
              control={control}
              render={({ field }) => (
                <input className="form-control" type="number" {...field} />
              )}
            />
            <label className="form-label mt-3">End Value (optional)</label>
            <Controller
              name="endValue"
              control={control}
              render={({ field }) => (
                <input className="form-control" type="number" {...field} />
              )}
            />
          </>
        )}

        {datatype === "String" && (
          <>
            <label className="form-label mt-3">Min Length</label>
            <Controller
              name="minLength"
              control={control}
              render={({ field }) => (
                <input className="form-control" type="number" {...field} />
              )}
            />
            <label className="form-label mt-3">Max Length</label>
            <Controller
              name="maxLength"
              control={control}
              render={({ field }) => (
                <input className="form-control" type="number" {...field} />
              )}
            />
            <label className="form-label mt-3">Default Value</label>
            <Controller
              name="defaultValue"
              control={control}
              render={({ field }) => (
                <input className="form-control" type="text" {...field} />
              )}
            />
          </>
        )}

        {datatype === "Boolean" && (
          <div className="mt-3">
            <label className="form-label">Default Value *</label>
            <Controller
              name="booleanDefault"
              control={control}
              render={({ field }) => (
                <select className="form-select" {...field}>
                  <option value="True">True</option>
                  <option value="False">False</option>
                </select>
              )}
            />
          </div>
        )}

        {datatype === "Enum" && (
          <div className="mt-3">
            <label className="form-label">Enum Values *</label>
            {enumList.map((item, index) => (
              <div key={item.id} className="d-flex mb-2">
                <input
                  className="form-control me-2"
                  placeholder="Enum value"
                  value={item.value}
                  onChange={(e) => {
                    const newList = [...enumList];
                    newList[index].value = e.target.value;
                    setEnumList(newList);
                  }}
                />
                <select
                  className="form-select me-2"
                  value={item.type}
                  onChange={(e) => {
                    const newList = [...enumList];
                    newList[index].type = e.target.value;
                    setEnumList(newList);
                  }}
                >
                  <option value="Int">Int</option>
                  <option value="String">String</option>
                </select>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => removeEnum(item.id)}
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              className="btn btn-success"
              onClick={addEnum}
            >
              + Add Enum
            </button>
          </div>
        )}

        {datatype === "Array" && (
          <div className="alert alert-info mt-3">
            Array fields are not implemented yet.
          </div>
        )}

        {/* Submit Button */}
        <div className="mt-4">
          <button type="submit" className="btn btn-primary me-2">
            Save
          </button>
          <button type="button" className="btn btn-secondary">
            Save & Close
          </button>
        </div>
      </form>

      {/* Centered Output Box */}
      {formData && (
        <div
          className="alert alert-success mt-4 text-center"
          style={{
            margin: "auto",
            maxWidth: "600px",
          }}
        >
          <h4>Configuration Result</h4>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JSONFieldAttributesForm;
