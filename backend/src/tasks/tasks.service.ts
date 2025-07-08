import {Injectable} from '@nestjs/common';
import {CreateTaskDto} from "./dto/create-task.dto";
import {UpdateTaskDto} from "./dto/update-task.dto";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService ) {
  }
  create(task: CreateTaskDto) {
    console.log('TasksService Create', task);
  }

  findAll() {
    console.log('TasksService findAll');
     return 'dasda'
  }

  findOne(id: number) {
    console.log('TasksService findOne', id);
  }

  update(id: number, task: UpdateTaskDto) {
    console.log('TasksService update', id, task);
  }

  delete(id: number) {
    console.log('TasksService delete', id);
  }
}
