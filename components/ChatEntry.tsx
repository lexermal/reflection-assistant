import { Grid, Text } from '@mantine/core';
import { IconCat, IconUser } from '@tabler/icons';

export default function ChatEntry(props: { user: boolean; message: string }) {
  return (
    <Grid>
      <Grid.Col span={1}>
        {props.user ? <IconUser size={25} /> : <IconCat size={25} />}
      </Grid.Col>
      <Grid.Col span={11}>
        <Text>{props.message}</Text>
      </Grid.Col>
    </Grid>
  );
}
