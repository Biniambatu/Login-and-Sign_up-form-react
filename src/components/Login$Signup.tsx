import React, { useState } from "react";
import {FormControl,FormErrorMessage,FormHelperText,FormLabel,Input,InputRightElement,chakra,Button,Heading,Radio,Checkbox,VStack, Link, HStack, Image,} from "@chakra-ui/react";
import logo from '../assets/google-play-games.webp'
//import './login_signup.css'
import { Grid, GridItem, Show } from "@chakra-ui/react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "bootstrap/dist/css/bootstrap.min.css";
const schema = z.object({
  name: z.string().min(3, { message: "Name must be atleast 3 characters" }),
  email: z.string({ invalid_type_error: "email field is required." }).email({}),
  password: z
    .number({ invalid_type_error: "Password field is required." })
    .min(5, { message: "password must be greater than 5." }),
});
type FormData = z.infer<typeof schema>;
const Login$Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const [action, setAction] = useState("Sign up");

  return (
    <>
      <Grid
        
        templateAreas={{
          base: `"nav" "main"`,
          lg: `"nav nav" "main"`,
        }}>
          <GridItem area='nav' >
            <HStack justifyContent='space-between'>
              <Image src={logo} boxSize="60px" padding="10px" marginLeft="10px" />
              <HStack >
                <Link>Home</Link>
                <Link>Account</Link>
                <Link>Service</Link>
                <Link>About</Link>
              </HStack>
            </HStack>
          </GridItem>
          <GridItem area="main" bg="dodgerblue">
          <form
            id="form-control"
            className="form-control"
            onSubmit={handleSubmit((data) => console.log(data))}>
            <Heading className="mb-4" marginLeft='150px'>{action}</Heading>
            <VStack>
              <FormControl className="mb-2">
                {action === "Login" ? null : (
                  <>
                    <Input {...register("name")} id="name" placeholder="name" />
                    {errors.name && (
                      <p className="text-danger">{errors.name.message}</p>
                    )}
                  </>
                )}
              </FormControl>
              <FormControl className="mb-2">
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="email"
                />
                {errors.email && (
                  <p className="text-danger">{errors.email.message}</p>
                )}
              </FormControl>
              <FormControl className="mb-2">
                <Input
                  {...register("password", { valueAsNumber: true })}
                  id="password"
                  type="password"
                  placeholder="password"
                />
                {errors.password && (
                  <p className="text-danger">{errors.password.message}</p>
                )}
              </FormControl>
              <Checkbox value="Sasuke"> Remember me</Checkbox>
              <FormControl display="flex" justifyContent="space-between">
                <Button
                  className={action === "Login" ? "login this" : "signup"}
                  marginLeft="50px"
                  id="signup"
                  mt={4}
                  colorScheme="blue"
                  type="submit"
                  onClick={() => setAction("Sign up")}
                >
                  Sign up
                </Button>
                <Button
                  className={action === "Sign up" ? "signup this" : "signup"}
                  marginRight="50px"
                  id="login"
                  mt={4}
                  colorScheme="blue"
                  type="submit"
                  onClick={() => setAction("Login")}
                >
                  login{" "}
                </Button>
              </FormControl>
            </VStack>
          </form>
        </GridItem>
      </Grid>
    </>
  );
};

export default Login$Signup;
