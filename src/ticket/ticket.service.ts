import { Injectable } from '@nestjs/common';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { v4 as uuidv4 } from 'uuid'; // Docs: https://www.npmjs.com/package/uuid

@Injectable()
export class TicketService {
  private event = [];

  create( inputTicket: CreateTicketDto) { 
    this.event.push({
      id: uuidv4(),
      ...inputTicket,
      dateEvent: new Date()
    });    
    return 'Event Added!'; 
  }

  findAll() {
    return this.event;
  }

  findOne(id: string) {
    return this.event.find( ({ id: ticketID }) => ticketID === id);
  }

  update(id: string, updateTicketDto: UpdateTicketDto) {
    const ticketFounded = this.findOne(id);
    if(ticketFounded){
      for (let index = 0; index < this.event.length; index++) {
        if( this.event[index].id === ticketFounded.id ){
          this.event[index] = {
            ...updateTicketDto,
          }
        }
      }
    }
    return `Event ${ ticketFounded.id } modified!`;
  }

  remove(inputId: string) {
    this.event = this.event.filter(({ id }) => id !== inputId);
    return `ticket with id '${ inputId }' has been deleted!`;
  }
}
