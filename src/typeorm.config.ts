import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

const config: TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "Role_Management",
  entities: [join(process.cwd(), "dist/**/*.entity.js")],
  // do NOT use synchronize: true in real projects
  synchronize: true,
};
export default config;
