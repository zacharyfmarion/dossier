import * as React from 'react';
import { Modal, Icon, Tag } from 'antd';
import { Flex } from 'reflexbox';
import styled from 'styled-components';
import placeholder from 'assets/placeholder.png';
import Text from 'components/Text';

type Props = {
  item: Object,
  onClose: Function
};

const mapWithNewline = (text: string): React.Node =>
  text.split('\n').map(function(item, key) {
    return (
      <ListItem key={key}>
        {item.substring(2)}
      </ListItem>
    );
  });

class ItemModal extends React.Component<Props> {
  render() {
    const { item, onClose } = this.props;
    return (
      <StyledModal
        title={
          <Flex column>
            <ModalTitle>
              {item.title}
              {item.link &&
                <Link href={item.link} target="_blank">
                  <Icon type="link" />
                </Link>}
            </ModalTitle>
            <DateAccessed>
              {`Accessed ${new Date(item.dateAccessed).toDateString()}`}
            </DateAccessed>
          </Flex>
        }
        visible
        footer={null}
        onOk={onClose}
        onCancel={onClose}
      >
        <ImageWrapper>
          <ModalImage src={item.image || placeholder} alt="Media Item" />
          <Tags align="center">
            {item.tags &&
              item.tags.map((tag, i) =>
                <Tag key={i}>
                  {tag}
                </Tag>
              )}
          </Tags>
        </ImageWrapper>
        <PaddedFlex column>
          {item.description}
          {item.notes &&
            item.notes.length > 0 &&
            <UnorderedList>
              {mapWithNewline(item.notes)}
            </UnorderedList>}
        </PaddedFlex>
      </StyledModal>
    );
  }
}

const DateAccessed = styled(Text)`
  color: gray;
`;

const ModalTitle = styled.h3`margin-right: 10px;`;

const Link = styled.a`margin-left: 5px;`;

const PaddedFlex = styled(Flex)`
  padding: 10px 25px;
  word-break: break-word;
`;

const StyledModal = styled(Modal)`
  .ant-modal-body {
    padding: 0;
  }
`;

const UnorderedList = styled.ul`margin-top: 5px;`;

const ListItem = styled.li`
  list-style-type: disc;
  margin-left: 15px;
`;

const Tags = styled(Flex)`
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  height: 32px;
  padding: 0 10px;
  background: rgba(100, 100, 100, 0.6);
`;

const ImageWrapper = styled.div`position: relative;`;

const ModalImage = styled.img`width: 100%;`;

export default ItemModal;
