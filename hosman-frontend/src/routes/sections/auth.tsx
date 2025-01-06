// import Login from "./pages/login";

import { Outlet } from "react-router-dom";
import { CenteredSignInView } from "src/sections/auth/view/sign-in-view";
import { SignUpView } from "src/sections/auth/view/sign-up-view";

export const authRoutes = [
  {
    path: "/auth",
    element:(
      <Outlet/>
    ),
    children:[
      {
        path:"sign-in",
        element:(
          <CenteredSignInView/>
        )
      },
      {
        path:"sign-up",
        element:(
          <SignUpView/>
        )
      },
      
    ]
  },
  
];