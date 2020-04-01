import { prisma } from "../../../../generated/prisma-client";
import * as bcrypt from "bcryptjs";

export default {
  Mutation: {
    create: async (_, args) => {
      const { name, email, password } = args;
      const exists = await prisma.$exists.user({ OR: [{ name }, { email }] });
      if (exists) {
        throw Error("이메일 또는 이름 중복");
      }
      const hashedPassword = await bcrypt.hash(password, 5);
      await prisma.createUser({ name, email, password: hashedPassword });
      return true;
    }
  }
};
