import bcrypt from "bcrypt";
import { jwtHelper } from "../../utils/jwtHelper";
import config from "../../config";

interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
}

export const Mutation = {
  signup: async (parent: any, args: userInfo, { prisma }: any) => {
    const isExist = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });
    if (isExist) {
      return {
        userError: "Already this email is registered!",
        token: null,
      };
    }
    const hashedPassword = await bcrypt.hash(args.password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: args.name,
        email: args.email,
        password: hashedPassword,
      },
    });

    if (args.bio) {
      await prisma.profile.create({
        data: {
          bio: args.bio,
          userId: newUser.id,
        },
      });
    }

    const token = await jwtHelper(
      { userId: newUser.id },
      config.jwt.secret as string
    );

    return {
      userError: null,
      token: token,
    };
  },
  signin: async (parent: any, args: any, { prisma }: any) => {
    const user = await prisma.user.findFirst({
      where: {
        email: args.email,
      },
    });

    if (!user) {
      return {
        userError: "Email or Password not correct!",
        token: null,
      };
    }

    const correctPass = await bcrypt.compare(args.password, user.password);
    if (!correctPass) {
      return {
        userError: "Email or Password not correct!",
        token: null,
      };
    }
    const token = await jwtHelper(
      { userId: user.id },
      config.jwt.secret as string
    );

    return {
      userError: null,
      token: token,
    };
  },
};
