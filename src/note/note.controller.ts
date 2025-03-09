import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { NoteService } from './note.service';
import { Note } from './note.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('note')
export class NoteController {
    constructor(private readonly noteService: NoteService) {}

    @UseGuards(JwtAuthGuard)
    @Get('findall')
    async findAll() {
        return await this.noteService.findAll();
    }

    @UseGuards(JwtAuthGuard)
    @Post('createnote')
    async create(@Body() note: Note) {
        await this.noteService.create(note);
        return 'Note created successfully';
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async findOne(@Param('id') id: number): Promise<Note> {
        return await this.noteService.findOne(id);
    }

    @UseGuards(JwtAuthGuard)
    @Put(':id')
    async update(@Param('id') id: number, @Body() note: Partial<Note>): Promise<Note> {
        return await this.noteService.update(id, note);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        await this.noteService.remove(id);
    }
}
