import { AppConfig } from '@utils/AppConfig';
declare module '*module.css' {
  const styles: {
    [className: string]: string;
  };
  export default styles;
}
