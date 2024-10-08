import AuthForm from "@/components/shared/AuthForm";

import { getLoggedInUser } from "@/lib/actions/user.actions";

type Props = {};

const SignIn = async (props: Props) => {
  const user = await getLoggedInUser();

  return (
    <div className="flex justify-center p-6">
      <AuthForm user={user} type="sign-in" />
    </div>
  );
};

export default SignIn;
