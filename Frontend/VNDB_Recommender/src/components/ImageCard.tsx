import { createStyles, Card, Image, Text, Group, RingProgress, rem, UnstyledButton } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: "25vw",
    minWidth: "400px"
  },

  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: `${theme.spacing.sm} ${theme.spacing.lg}`,
    borderTop: `${rem(1)} solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    lineHeight: 1,
  },
}));

interface ImageCardProps {
  image: string;
  title: string;
  description: string;
  languages: string[];
  platforms: string[];
  length: string;
}

export default function ImageCard({ image, title, description, languages, platforms, length }: ImageCardProps) {
  const { classes } = useStyles();

  const langs = languages.map((language) => (
      <Text component="span" size="xs" mr={5} color="dimmed">
        {language}
      </Text>
  ));

  const plats = platforms.map((platform) => (
    <Text component="span" size="xs" mr={5} color="dimmed">
      {platform}
    </Text>
));

  return (
    <UnstyledButton>
      <Card withBorder padding="lg" className={classes.card}>
        <Card.Section>
          <Image mt={"lg"} src={image} alt={title} height={400} fit='contain'/>
        </Card.Section>

        <Group position="apart" mt="xl">
          <Text fz="sm" fw={700} className={classes.title}>
            {title}
          </Text>
        </Group>
        <Text mt="sm" mb="md" c="dimmed" fz="xs" lineClamp={4}>
          {description}
        </Text>

        <Card.Section withBorder className='classes.section'>
          <Group mt="xs" mb="lg" ml="lg">
            <Text fz="sm" fw={400}>
              Languages: {langs}
            </Text>
          </Group>
        </Card.Section>
        <Card.Section withBorder className='classes.section'>
          <Group mt="xs" mb="lg" ml="lg">
            <Text fz="sm" fw={400}>
              Platforms: {plats}
            </Text>
          </Group>
        </Card.Section>
        <Card.Section withBorder className='classes.section'>
          <Group mt="xs" mb="lg" ml="lg">
            <Text fz="sm" fw={400}>
              Average Play Time: {length}
            </Text>
          </Group>
        </Card.Section>
      </Card>
    </UnstyledButton>
  );
}