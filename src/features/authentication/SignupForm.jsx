import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSignup from "./useSignup";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { isLoading, signup } = useSignup();
  const { errors } = formState;
  console.log(errors);
  const onSubmit = ({ fullName, email, password, passwordConfirm }) => {
    console.log(fullName);
    console.log(errors);
    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          reset();
        },
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="Full name"
        error={errors?.fullName && errors?.fullName.message}
      >
        <Input
          type="text"
          id="fullName"
          disabled={isLoading}
          {...register("fullName", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow
        label="Email address"
        error={errors?.email && errors?.email.message}
      >
        <Input
          type="email"
          id="email"
          disabled={isLoading}
          {...register("email", {
            required: "This field is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password && errors?.password.message}
      >
        <Input
          type="password"
          disabled={isLoading}
          id="password"
          {...register("password", {
            required: "This field is required",
            minLength: {
              value: 8,
              message: "Password need mimimum 8 characters",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Repeat password"
        error={errors?.passwordConfirm && errors?.passwordConfirm.message}
      >
        <Input
          type="password"
          disabled={isLoading}
          id="passwordConfirm"
          {...register("passwordConfirm", {
            required: "This field is required",
            validate: (value) => {
              // We took the value of the Password field and compare it to the value of PasswordConfirm field
              const password = getValues().password;
              if (value === password) {
                return true;
              } else return "Passwords needs to match";
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          onClick={reset}
          variation="secondary"
          type="reset"
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button disabled={isLoading}>Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
