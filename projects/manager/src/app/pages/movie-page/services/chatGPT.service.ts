import { Injectable } from '@angular/core';
import axios from 'axios';
import { HttpClient } from '@angular/common/http';
import { commonResDataString } from '../../../core/interface/common/commonResDataString';
import { TextDialogService } from 'projects/share-libs/src/lib/features/text-dialog/services/text-dialog.service';



@Injectable({
  providedIn: 'root'
})

export class ChatGPTService {
  apiUrl = "https://api.openai.com/v1/chat/completions";
  token = "";
  config = {};

  constructor(
    private http: HttpClient,
    private textDialogService: TextDialogService
  ) {

  }

  getAdvice = async (message: {
    role: string,
    content: string
  }[]) => {
    console.log('openApiRequest- message', message);

    try {
      if (!this.token) {
        await this.getChatGPTToken().then((res) => {
          this.token = res.data!;
          this.config = {
            headers: {
              Authorization: `Bearer ${this.token}`,
            }
          };
        });
      };

      const { data } = await axios.post(
        this.apiUrl,
        {
          messages: message,
          model: "gpt-3.5-turbo",
          max_tokens: 500,
        },
        this.config
      );
      console.log('openAiRequest', data);
      return data;

    } catch (err) {
      console.log(err);
    };
  }



  getChatGPTToken(): Promise<commonResDataString> {
    return new Promise((resolve, reject) => {
      this.http.get<commonResDataString>('https://api.cine-pos.com/v1/common/chatGPT/key').subscribe(
        (res) => {
          if (res.code !== 1) {
            this.textDialogService.openErrorDialog(
              {
                title: '取得ChatGPT錯誤',
                content: res.message!
              }
            )
            reject(new Error('API request failed'));
          } else {
            resolve(res);
          }
        },
        (error) => {
          reject(error);
        }
      );
    });
  }




}
