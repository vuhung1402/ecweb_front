import { Menu } from 'antd'
import { AppstoreOutlined, MailOutlined, SettingOutlined, CalendarOutlined } from '@ant-design/icons';

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function Filter({onClick}){

  const category = [
    {
        key: '1',
        icon: null,
        children: [
            {
                key: '10',
                icon: null,
                children: null,
                label: 'Xem tất cả áo',
                route: 'ao-so-mi',
                type: '',
            },
            {
                key: '2',
                icon: null,
                children: null,
                label: 'Ao so mi',
                route: 'ao-so-mi',
                type: '',
            },
            {
                key: '3',
                icon: null,
                children: null,
                label: 'Ao thun',
                route:'ao-thun',
                type: ''
            }
        ],
        label: 'Ao',
        type: ''
    },
    {
        key: '4',
        icon: null,
        children: [
            {
                key: '5',
                icon: null,
                children: null,
                label: 'Quan dui',
                route: 'quan-dui',
                type: '',
            },
            {
                key: '6',
                icon: null,
                children: null,
                label: 'Quan dai',
                route:'quan-dai',
                type: ''
            }
        ],
        label: 'Quan',
        type: ''
    }
  ]

    return(
        <div className=' p-5'>
            <Menu
              onClick={onClick}
              className=''
              items={category}
              mode='inline'
            />
        </div>
    )
}

export default Filter