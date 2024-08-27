-- CreateEnum
CREATE TYPE "Skills" AS ENUM ('Java', 'Python', 'C');

-- CreateTable
CREATE TABLE "Entry" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "skills" TEXT[],
    "interests" TEXT[],
    "availability" JSONB,
    "relation" TEXT[],
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "groupID" TEXT,

    CONSTRAINT "Entry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" TEXT NOT NULL,
    "senderEmail" TEXT NOT NULL,
    "recipientEmail" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Class" (
    "classID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT NOT NULL,

    CONSTRAINT "Class_pkey" PRIMARY KEY ("classID")
);

-- CreateTable
CREATE TABLE "Project" (
    "projectID" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "groupID" TEXT,
    "classID" TEXT NOT NULL,
    "ownerEmail" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("projectID")
);

-- CreateTable
CREATE TABLE "Group" (
    "groupID" TEXT NOT NULL,
    "meetingTimes" TEXT[],
    "name" TEXT NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("groupID")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "id" TEXT NOT NULL,
    "groupID" TEXT NOT NULL,
    "interest" INTEGER NOT NULL,
    "skill" INTEGER NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassPreferences" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "classID" TEXT NOT NULL,
    "preferredSkills" TEXT[],
    "preferredSkillsWeight" INTEGER NOT NULL,
    "interests" TEXT[],
    "interestsWeight" INTEGER NOT NULL,

    CONSTRAINT "ClassPreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StablePreferences" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "stableSkills" TEXT[],
    "stableInterests" TEXT[],
    "availability" JSONB NOT NULL,

    CONSTRAINT "StablePreferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EntryClasses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Entry_email_key" ON "Entry"("email");

-- CreateIndex
CREATE INDEX "Message_senderEmail_idx" ON "Message"("senderEmail");

-- CreateIndex
CREATE INDEX "Message_recipientEmail_idx" ON "Message"("recipientEmail");

-- CreateIndex
CREATE UNIQUE INDEX "Group_groupID_key" ON "Group"("groupID");

-- CreateIndex
CREATE UNIQUE INDEX "Preferences_groupID_key" ON "Preferences"("groupID");

-- CreateIndex
CREATE UNIQUE INDEX "ClassPreferences_userID_classID_key" ON "ClassPreferences"("userID", "classID");

-- CreateIndex
CREATE UNIQUE INDEX "StablePreferences_userID_key" ON "StablePreferences"("userID");

-- CreateIndex
CREATE UNIQUE INDEX "_EntryClasses_AB_unique" ON "_EntryClasses"("A", "B");

-- CreateIndex
CREATE INDEX "_EntryClasses_B_index" ON "_EntryClasses"("B");

-- AddForeignKey
ALTER TABLE "Entry" ADD CONSTRAINT "Entry_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES "Group"("groupID") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_senderEmail_fkey" FOREIGN KEY ("senderEmail") REFERENCES "Entry"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_recipientEmail_fkey" FOREIGN KEY ("recipientEmail") REFERENCES "Entry"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES "Group"("groupID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("classID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Project" ADD CONSTRAINT "Project_ownerEmail_fkey" FOREIGN KEY ("ownerEmail") REFERENCES "Entry"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassPreferences" ADD CONSTRAINT "ClassPreferences_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassPreferences" ADD CONSTRAINT "ClassPreferences_classID_fkey" FOREIGN KEY ("classID") REFERENCES "Class"("classID") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StablePreferences" ADD CONSTRAINT "StablePreferences_userID_fkey" FOREIGN KEY ("userID") REFERENCES "Entry"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryClasses" ADD CONSTRAINT "_EntryClasses_A_fkey" FOREIGN KEY ("A") REFERENCES "Class"("classID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EntryClasses" ADD CONSTRAINT "_EntryClasses_B_fkey" FOREIGN KEY ("B") REFERENCES "Entry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
