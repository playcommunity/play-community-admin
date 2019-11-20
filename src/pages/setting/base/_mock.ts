import { Request, Response } from 'express';

export default {
  'POST  /api/forms': (_: Request, res: Response) => {
    res.send({ success: true, message: 'Ok' });
  },
  'POST /board/setting/base': (req: Request, res: Response) => {
    res.status(200).send({
      success: true,
    });
  },
  'GET /board/setting/base': (req: Request, res: Response) => {
    res.status(200).send({
      success: true,
      name: 'PlayScala社区',
      url: 'https://www.playscala.cn',
      title: 'PlayScala社区',
      logo: 'https://www.playscala.cn/assets/images/logo.png',
      favorite: 'https://www.playscala.cn/favicon.ico',
      seoDescription: 'PlayScala社区',
      seoKeyword: 'Play,Scala',
    });
  },
};
