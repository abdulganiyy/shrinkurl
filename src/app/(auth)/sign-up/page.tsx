import React from "react";

import AuthForm from "@/components/shared/AuthForm";
import { getLoggedInUser } from "@/lib/actions/user.actions";

type Props = {};

const SignUp = async (props: Props) => {
  const user = await getLoggedInUser();

  return (
    <div className="flex justify-center px-6">
      <AuthForm user={user} type="sign-up" />
    </div>
  );
};

export default SignUp;
