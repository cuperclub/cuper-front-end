import { Component, OnInit, Input } from '@angular/core';

interface OptionRow {
  title: string;
  description: string;
  image: string;
  number: number;
  text: string;
}

@Component({
  selector: 'cuper-table-card',
  templateUrl: './table-card.component.html',
  styleUrls: ['./table-card.component.scss']
})
export class TableCardComponent implements OnInit {
  @Input() items: OptionRow[];
  @Input() onClick: Function;

  constructor() {
    const mockData = [
      {
        image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3144848/3333/2500/m1/fpnw/wm0/jon-snow-01-.jpg?1503324019&s=361666065e9c69eb2e5c669e40b2a8b4',
        title: 'Jhon snow',
        description: 'The King of the North',
        number: 30,
        text: 'Points',
      },
      {
        image: 'https://imagesvc.timeincapp.com/v3/fan/image?url=https%3A%2F%2Fwinteriscoming.net%2Ffiles%2F2017%2F05%2Fgame-of-thrones-season-5-nights-king-hbo-600x337.jpg&w=736&h=485&c=sc',
        title: 'Jhon snow',
        description: 'the king of the North',
        number: 40,
        text: 'Points'
      },
      {
        image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3144848/3333/2500/m1/fpnw/wm0/jon-snow-01-.jpg?1503324019&s=361666065e9c69eb2e5c669e40b2a8b4',
        title: 'Jhon snow',
        description: 'the king of the North',
        number: 20,
        text: 'Points'
      },
      {
        image: 'https://cmkt-image-prd.global.ssl.fastly.net/0.1.0/ps/3144848/3333/2500/m1/fpnw/wm0/jon-snow-01-.jpg?1503324019&s=361666065e9c69eb2e5c669e40b2a8b4',
        title: 'Jhon snow',
        description: 'the king of the North',
        number: 20,
        text: 'Points'
      }
    ];
    this.items = this.items ? this.items : mockData;
  }

  ngOnInit() {
  }

}
