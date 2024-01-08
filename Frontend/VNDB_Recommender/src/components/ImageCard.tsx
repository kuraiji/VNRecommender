import { createStyles, Card, Image, Text, Group, rem, UnstyledButton } from '@mantine/core';
import { IsMobile } from '../api/main';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    width: "18vw",
    minWidth: "15px"
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

  li: {
    listStyleType: "none",
    display: "inline-block"
  },
}));

interface ImageCardProps {
  image: string;
  title: string;
  description: string;
  languages: string[];
  platforms: string[];
  length: string;
  id: string;
}

function Open_VNDB(id: string){
  window.open('https://vndb.org/' + id, '_blank');
}

export default function ImageCard({ image, title, description, languages, platforms, length, id }: ImageCardProps) {
  const { classes } = useStyles();

  const isMobile = IsMobile();

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
    <UnstyledButton onClick={()=>{Open_VNDB(id)}}>
      <Card withBorder padding="lg" className={classes.card} style={{width: isMobile ? "80vw" : "18vw"}}>
        <Card.Section>
          <Image mt={"lg"} src={image} alt={title} height={IsMobile() ? "45vh" : "20vw"} fit='cover'/>
        </Card.Section>

        <Group position="apart" mt="xl">
          <Text fz="sm" fw={700} className={classes.title} lineClamp={1}>
            {title}
          </Text>
        </Group>
        {description 
        ? 
        <Text mt="sm" mb="xs" c="dimmed" fz="xs" lineClamp={4}>
          {description}
        </Text> 
        : 
        <>
        <br />&nbsp;<br />&nbsp;<br />&nbsp;<br />&nbsp;<br />
        </>
        }

        <Card.Section withBorder className='classes.section'>
          <Group mt="xs" mb="xs" ml="lg">
            <Text fz="xs" fw={400} truncate='end'>
              Languages: {langs.map((element, index) => <li className={classes.li} key={index} >{element}</li>)}
            </Text>
          </Group>
        </Card.Section>
        <Card.Section withBorder className='classes.section'>
          <Group mt="xs" mb="xs" ml="lg">
            <Text fz="xs" fw={400} truncate='end'>
              Platforms: {plats.map((element, index) => <li className={classes.li} key={index}>{element}</li>)}
            </Text>
          </Group>
        </Card.Section>
        <Card.Section withBorder className='classes.section'>
          <Group mt="xs" mb="xs" ml="lg">
            <Text fz="xs" fw={400}>
              Average Play Time: {length}
            </Text>
          </Group>
        </Card.Section>
      </Card>
    </UnstyledButton>
  );
}