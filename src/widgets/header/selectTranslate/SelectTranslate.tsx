import s from './SelectTranslate.module.css'
import { FlagRussiaIcon, FlagUnitedKingdomIcon, Select, SelectItem } from '@internshipsamyrai44-ui-kit/components-lib';

export const SelectTranslate = () => {


  return (
    <div className={s.select}>
      <Select defaultValue={'en'} >
        <SelectItem value="en">
          <div className={s.selectValue}>
            <FlagUnitedKingdomIcon />
            <span>English</span>
          </div>
        </SelectItem>
        <SelectItem value="ru">
          <div className={s.selectValue}>
            <FlagRussiaIcon />
            <span>Русский</span>
          </div>
        </SelectItem>
      </Select>
    </div>
  );
};
