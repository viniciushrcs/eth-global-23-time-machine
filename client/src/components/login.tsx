import { useEffect, useState } from 'react';
import { connectSmartWallet } from '../../src/lib/wallet/wallet';
import { ConnectedComponents } from './connected';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Icons } from './ui/icons';
// import { Icons } from './ui/icons';

const loginSchema = z.object({
  email: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;

export const Login = () => {
  const [isLoading, setIsloading] = useState(false);

  let defaultEmail = '';
  if (typeof window !== 'undefined') {
    defaultEmail = localStorage.getItem('email') ?? '';
  }

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: defaultEmail,
    },
  });

  function onSubmit(values: LoginSchema) {
    const { email } = values;
    connectWallet(email);
    console.log(values);
  }
  const [signer, setSigner] = useState<any>(undefined);

  useEffect(() => {
    const user = localStorage.getItem('email');
    if (user) {
      connectWallet(user);
    }
  }, []);

  const connectWallet = async (email: string) => {
    try {
      setIsloading(true);
      const wallet = await connectSmartWallet(email);
      const s = await wallet.getSigner();
      setSigner(s);
      localStorage.setItem('email', email);
      setIsloading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return signer ? (
    <div>
      <ConnectedComponents signer={signer} />
    </div>
  ) : (
    <div className="flex justify-center">
      <Card className="w-full md:w-1/2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <CardContent className="grid gap-4">
              <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <FormControl>
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Logging you in...
                  </>
                ) : (
                  <p>Sign In with Email</p>
                )}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};
