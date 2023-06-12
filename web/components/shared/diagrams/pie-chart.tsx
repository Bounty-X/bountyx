import { ResponsivePie } from '@nivo/pie'

interface DataItem {
  id: string
  label: string
  value: number
  color: string
}

interface Props {
  data: DataItem[]
}

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.
const PieChart: React.FC<Props> = ({ data }: Props) => {
  return (
    <div style={{ height: '400px' }}>
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.25}
        padAngle={1}
        cornerRadius={5}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        borderWidth={1}
        borderColor={{
          from: 'color',
          modifiers: [['darker', parseFloat('0.2')]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#333333"
        arcLinkLabelsThickness={2}
        arcLinkLabelsColor={{ from: 'color' }}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor={{
          from: 'color',
          modifiers: [['darker', parseInt('2')]],
        }}
        defs={[]}
        fill={[]}
        legends={[]}
      />
    </div>
  )
}

export default PieChart
