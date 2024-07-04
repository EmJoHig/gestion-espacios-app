import { useAuth } from "../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/auth";

// import { Card, Message, Button, Input, Label } from "../components/ui";
import Card from '@mui/material/Card';
import { Box, Container } from "@mui/material";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
// import Container from "@mui/material/Container";

export function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { signin, errors: loginErrors, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => signin(data);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
  }, [isAuthenticated]);

  return (
    // <div className="">
    //   <Box >
        <Container>
          <Card>
            {loginErrors.map((error, i) => (
              // <Message message={error} key={i} />
              <h2>{error} - key : {i}</h2>
            ))}
            <h1 className="text-2xl font-bold">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                variant="standard"
                label="Write your email"
                type="email"
                name="email"
                placeholder=""
                {...register("email", { required: true })}
              />
              <p style={{color: "red"}}>{errors.email?.message}</p>

              <TextField
                variant="standard"
                label="Write your password"
                type="password"
                name="password"
                placeholder=""
                {...register("password", { required: true, minLength: 6 })}
              />
              
              <p style={{color: "red"}}>{errors.password?.message}</p>

              <Button type="submit" variant="contained">Login</Button>
            </form>

            <p className="flex gap-x-2 justify-between">
              Don't have an account? <Link to="/register" className="text-sky-500">Sign up</Link>
            </p>
          </Card>
        </Container>
    //   </Box>
    // </div>
  );
}
