import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialQuizEntities1738166400000 implements MigrationInterface {
  name = 'InitialQuizEntities1738166400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "quizzes" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "sessionId" character varying(255) NOT NULL,
        "currentStep" integer NOT NULL DEFAULT 0,
        "isComplete" boolean NOT NULL DEFAULT false,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_quizzes_sessionId" UNIQUE ("sessionId"),
        CONSTRAINT "PK_quizzes_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "questions" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "questionId" character varying(50) NOT NULL,
        "type" character varying(20) NOT NULL,
        "text" text NOT NULL,
        "options" json,
        "isRequired" boolean NOT NULL DEFAULT false,
        "order" integer NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "UQ_questions_questionId" UNIQUE ("questionId"),
        CONSTRAINT "PK_questions_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      CREATE TABLE "answers" (
        "id" uuid NOT NULL DEFAULT gen_random_uuid(),
        "quizId" uuid NOT NULL,
        "questionId" character varying(50) NOT NULL,
        "answer" json NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_answers_id" PRIMARY KEY ("id")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "answers"
      ADD CONSTRAINT "FK_answers_quizId"
      FOREIGN KEY ("quizId") REFERENCES "quizzes"("id")
      ON DELETE CASCADE ON UPDATE NO ACTION
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "answers" DROP CONSTRAINT "FK_answers_quizId"`,
    );
    await queryRunner.query(`DROP TABLE "answers"`);
    await queryRunner.query(`DROP TABLE "questions"`);
    await queryRunner.query(`DROP TABLE "quizzes"`);
  }
}
