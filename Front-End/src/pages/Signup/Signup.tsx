/* eslint-disable react/react-in-jsx-scope */
import { Container, Grid, Box, Typography, Stack } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { FC } from "react";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../components/FormInput/FormInput";
import { LinkItem } from "../Signin/Signin";

// ? SignUp Schema with Zod
const signupSchema = object({
  name: string().min(1, "Name is required").max(70),
  email: string().min(1, "Email is required").email("Email is invalid"),
  password: string()
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters")
    .max(32, "Password must be less than 32 characters"),
  passwordConfirm: string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ["passwordConfirm"],
  message: "Passwords do not match",
});

// ? Infer the Schema to get TypeScript Type
type ISignUp = TypeOf<typeof signupSchema>;

const SignupPage: FC = () => {
  // ? Default Values
  const defaultValues: ISignUp = {
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  };

  // ? Object containing all the methods returned by useForm
  const methods = useForm<ISignUp>({
    resolver: zodResolver(signupSchema),
    defaultValues,
  });

  // ? Form Handler
  const onSubmitHandler: SubmitHandler<ISignUp> = (values: ISignUp) => {
    console.log(values);
  };

  // ? Returned JSX
  return (
    <Container
      maxWidth={false}
      sx={{
        maxHeight: "100vh",
        backgroundColor: { xs: "#fff", md: "#f4f4f4" },
      }}
    >
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ width: "100%", height: "100%" }}
      >
        <Grid
          item
          sx={{ maxWidth: "70rem", width: "100%", backgroundColor: "#fff" }}
        >
          <Grid
            container
            sx={{
              boxShadow: { sm: "0 0 5px #ddd" },
              py: "6rem",
              px: "1rem",
            }}
          >
            <FormProvider {...methods}>
              <Grid
                item
                container
                justifyContent="space-between"
                rowSpacing={5}
                sx={{
                  maxWidth: { sm: "45rem" },
                  marginInline: "auto",
                }}
              >
                <Grid item xs={12} sm={6}>
                  <Box
                    display="flex"
                    flexDirection="column"
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ paddingRight: { sm: "3rem" } }}
                    onSubmit={methods.handleSubmit(onSubmitHandler)}
                  >
                    <Typography
                      variant="h6"
                      component="h1"
                      sx={{ textAlign: "center", mb: "1.5rem" }}
                    >
                      Create Your Account
                    </Typography>

                    <FormInput
                      label="Name"
                      type="text"
                      name="name"
                      focused
                      required
                    />
                    <FormInput
                      label="Enter your email"
                      type="email"
                      name="email"
                      focused
                      required
                    />
                    <FormInput
                      type="password"
                      label="Password"
                      name="password"
                      required
                      focused
                    />
                    <FormInput
                      type="password"
                      label="Confirm Password"
                      name="passwordConfirm"
                      required
                      focused
                    />

                    <LoadingButton
                      loading={false}
                      type="submit"
                      variant="contained"
                      sx={{
                        py: "0.8rem",
                        mt: 2,
                        width: "80%",
                        marginInline: "auto",
                      }}
                    >
                      Sign Up
                    </LoadingButton>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={6} sx={{}}>
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTd8fFN0dWRlbnR8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60"
                    alt="signup"
                    style={{
                      width: "100%",
                      height: "80%",
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                  />
                </Grid>
              </Grid>
              <Grid container justifyContent="center">
                <Stack sx={{ mt: "3rem", textAlign: "center" }}>
                  <Typography sx={{ fontSize: "0.9rem", mb: "1rem" }}>
                    Already have an account?{" "}
                    <LinkItem to="/signin">Login</LinkItem>
                  </Typography>
                </Stack>
              </Grid>
            </FormProvider>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SignupPage;
