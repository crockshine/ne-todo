import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiOperation({ summary: 'Создать новую задачу' })
  create(@Body() task: CreateTaskDto) {
    return this.tasksService.create(task);
  }

  @Get()
  @ApiOperation({ summary: 'Получить список всех задач' })
  findAll() {
    return this.tasksService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить задачу по ID' })
  @ApiParam({ name: 'id', type: Number, description: 'ID задачи' })
  findOne(@Param('id') id: string) {
    return this.tasksService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Обновить задачу' })
  @ApiParam({ name: 'id', type: Number, description: 'ID задачи' })
  update(@Param('id') id: string, @Body() task: UpdateTaskDto) {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Удалить задачу' })
  @ApiParam({ name: 'id', type: Number, description: 'ID задачи' })
  delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}