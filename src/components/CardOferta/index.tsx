import { FC } from "react";
import "./index.css";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";


const CardOferta: FC = () => {

    return (
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            sx={{ height: 300,
                  width: 300,
                  objectFit: 'cover'
             }}
            image="produtos/Matryoshka-caixa.png"
            title="Matryoshka caixa"
          />
          <CardContent>
            <Typography sx={{textAlign: 'center'}} gutterBottom variant="h5" component="div">
            Matryoshka - Segunda Edição
            </Typography>
            <Typography variant="body1">
             R$ 59,90
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Comprar</Button>
            <Button size="small">Ver detalhes</Button>
          </CardActions>
        </Card>
      );

}


export default CardOferta;