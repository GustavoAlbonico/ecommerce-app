import { FC } from "react";
import "./index.css";
import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";


const CardOferta: FC = () => {

    return (
      <div className="body-card-oferta">
        <Card sx={{ maxWidth: 250
                    
         }}>
          <CardMedia
            sx={{ height: 180,
                  width: 250,
                  objectFit: 'cover'
             }}
            image="produtos/Matryoshka-caixa.png"
            title="Matryoshka caixa"
          />
          <CardContent sx={{textAlign: 'center'}}>
            <Typography sx={{marginBottom: 2}} gutterBottom variant="h5" component="div">
            Matryoshka - Segunda Edição
            </Typography>
            <Typography sx={{fontSize: 18}} variant="body1">
             R$ 59,90
            </Typography>
          </CardContent>
          <CardActions sx={{ display: 'flex',
                             alignItems: 'center',
                             justifyContent: 'center',
                             color: '#fffffff'
           }}>
          <Button sx={{ backgroundColor: '#660099',
                        
           }} size="small">Comprar</Button>
          </CardActions>
        </Card>
      </div>
      );

}


export default CardOferta;