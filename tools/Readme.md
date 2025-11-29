### There are 3 command to help generate code automation:
**1. Command generate Entity + repository.**
- Example: 
``` 
npm run generate-@core-entity -- UserTest "firstName:string,lastName:string,email:string,status:boolean,phoneNumber:number" 
``` 
- Note: Entity Name has format PascalCase: UserProfile, PhotoImage...

**2. Command generate DTO.**
```
npm run generate-@api-dto UserTest
```
- This command will generate 4 file dto in new folder with name ```entity```

**3. Command generate CRUD.**
```
npm run generate-@api-crud UserTest
```
- This command will generate file service + controller.
Test commit trigger build