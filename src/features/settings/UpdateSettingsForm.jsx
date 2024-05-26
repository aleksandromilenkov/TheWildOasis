import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { getSettings } from "../../services/apiSettings";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import useEditSettings from "./useEditSettings";

function UpdateSettingsForm() {
  const [isLoading, settings = {}, error] = useSettings();
  const [isEditing, editSettings] = useEditSettings();
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: settings,
  });
  const {
    minBookingLength,
    maxBookingLength,
    maxGuestsPerBooking,
    breakfastPrice,
  } = settings;

  const onSubmit = (data) => {
    console.log(data);
    editSettings(data);
  };

  const handleUpdate = (e, settingName) => {
    const { value } = e.target;
    console.log(value);
    if (!value) return;
    // this is one way of creating object field:
    // const setting = new Object();
    // setting[settingName] = value;
    editSettings({ [settingName]: value });
  };

  if (isLoading) return <Spinner />;

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          {...register("minBookingLength")}
          onBlur={(e) => handleUpdate(e, "minBookingLength")}
          defaultValue={minBookingLength}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          defaultValue={maxBookingLength}
          id="max-nights"
          {...register("maxBookingLength")}
          onBlur={(e) => handleUpdate(e, "maxBookingLength")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          defaultValue={maxGuestsPerBooking}
          type="number"
          id="max-guests"
          {...register("maxGuestsPerBooking")}
          onBlur={(e) => handleUpdate(e, "maxGuestsPerBooking")}
          disabled={isEditing}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          defaultValue={breakfastPrice}
          type="number"
          id="breakfast-price"
          {...register("breakfastPrice")}
          onBlur={(e) => handleUpdate(e, "breakfastPrice")}
          disabled={isEditing}
        />
      </FormRow>
      <button>SUbmit</button>
    </Form>
  );
}

export default UpdateSettingsForm;
