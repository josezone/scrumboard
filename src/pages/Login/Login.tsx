import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Buffer } from "buffer";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { LoginStyle } from "./loginStyle";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

function Login(props: any) {
  const navigate = useNavigate();

  const {
    reset,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (e: any) => {
    handleSubmit((data: any) => {
      reset();
      e.target.reset();
      localStorage.setItem(
        "data",
        Buffer.from(`${data.username}:${data.password}`).toString("base64")
      );
      props.setLoginData(
        Buffer.from(`${data.username}:${data.password}`).toString("base64")
      );
      navigate("/");
    })(e);
  };

  return (
    <LoginStyle>
      <div className="container">
        <div className="top"></div>
        <div className="bottom"></div>
        <div className="center">
          <form onSubmit={onSubmit}>
            <h2>Please Sign In</h2>

            <Controller
              name="username"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="username"
                  variant="outlined"
                  error={errors.username ? true : false}
                  helperText={errors?.username?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="password"
                  variant="outlined"
                  error={errors.password ? true : false}
                  helperText={errors?.password?.message}
                />
              )}
            />

            <Button type="submit" variant="outlined">
              Submit
            </Button>
          </form>
        </div>
      </div>
    </LoginStyle>
  );
}

export default Login;
