export interface Song {
    id ?: number;
    filename ?: string;
    name ?: string;
    album ?: string;
    artist ?: string;
    date ?: Date;
    image ?: string;
    description ?: string;
}

export class Playlist {
    private list: Song[] = [];
    private index: number = 0;

    constructor(...songs: Song[]) {
        this.list.concat(songs);
    }

    public addSongs(...songs: Song[]) {
        this.list = this.list.concat(songs);
    }

    public get songs () { return this.list; }

    public get currentIndex () { return this.index; }

    public get current (): Song | undefined {
        if(this.index > -1 && this.index < this.list.length)
            return this.list[this.index];
        
        return undefined;
    }
    
    public next (loopAtEnd = false): Song | undefined {
        if(this.index + 1 < this.list.length)
            return this.list[this.index + 1];
        else if(loopAtEnd)
            return this.list[0];

        return undefined;
    }

    public last (loopAtEnd = false): Song | undefined {
        if(this.index - 1 >= 0)
            return this.list[this.index - 1];
        else if(loopAtEnd)
            return this.list[this.list.length - 1];

        return undefined;
    }

    public playSong(song: Song): Song | undefined  {
        this.index = this.list.indexOf(song);
        console.log(this.index)
        return this.current;
    }

    public playAtIndex(index: number): Song | undefined {
        this.index = index;
        return this.current;
    }

    public playNext(loopAtEnd = false): Song | undefined {
        if(this.index + 1 < this.list.length) {
            this.index++;
            return this.current;
        }
        else if(loopAtEnd)
        {
            this.restart();
            return this.current;
        }

        return undefined;
    }

    public playLast(loopAtEnd = false): Song | undefined {
        if(this.index - 1 >= 0) {
            this.index--;
            return this.current;
        }
        else if(loopAtEnd)
        {
            this.setToLast();
            return this.current;
        }

        return undefined;
    }

    public restart() {
        this.index = 0;
    }

    public setToLast() {
        this.index = this.list.length - 1;
    }
}
/*
export class Queue extends Playlist {

}*/