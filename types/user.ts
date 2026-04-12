import { Prisma } from "@/lib/generated/prisma/client";

export type FullUser = Prisma.UserGetPayload<{
  include: {
    enrollments: {
      include: {
        course: {
          include: { lessons: true };
        };
      };
    };
    lessonProgres: true;
  };
}>;
