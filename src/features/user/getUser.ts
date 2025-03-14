import { prisma } from "@/shared/lib/prisma";

export async function getUser(userId: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } });
  return user;
}
