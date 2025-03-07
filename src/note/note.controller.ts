import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from './note.entity';

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @Get()
    async findAll() {
        return await this.noteService.findAll();
    }

    @Post()
    async create(@Body() note: Note) {
        await this.noteService.create(note);
        return 'Note created successfully';
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Note> {
        return await this.noteService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: number, @Body() note: Partial<Note>): Promise<Note> {
        return await this.noteService.update(id, note);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        await this.noteService.remove(id);
    }
}
