npm install @nestjs/typeorm typeorm sqlite3

Locate the findOne method and update the return to look like this:

findOne(id: number) {
return this.repo.findOneBy({ id });
}
Locate the find method and update the return to look like this:

find(email: string) {
return this.repo.find({ where: { email } });
}

npm run start:dev

npm install cookie-session @types/cookie-session
